<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\Request as ReqModel; // avoid naming conflict
use App\Jobs\ForecastJob;

class ItemController extends Controller
{
    /**
     * 🔥 GET ITEMS
     * - Normal → return all items
     * - With QR → return specific item
     */
    public function index(Request $request)
    {
        // ✅ Scanner request (get item by QR)
        if ($request->has('qr')) {
            return Item::with('dept')
                ->where('qr_code', $request->qr)
                ->get();   // keep as array (matches your frontend)
        }

        // ✅ Dashboard request (all items)
        return Item::with('dept')->get();
    }

    /**
     * 🔥 SCAN QR → Update stock + create records
     */
    public function scan(Request $request)
    {
        $request->validate([
            'qr' => 'required|string',
            'qty' => 'required|integer',
            'dept_id' => 'required|exists:depts,id'
        ]);

        // 🔍 Find item
        $item = Item::where('qr_code', $request->qr)->firstOrFail();

        // 📦 Update stock
        $item->qty += $request->qty;
        $item->save();

        // 🎯 Dynamic priority logic (better than hardcoded)
        $priority = $item->qty < 10 ? 'high' : 'medium';

        // 📜 Create transaction
        Transaction::create([
            'item_id' => $item->id,
            'dept_id' => $request->dept_id,
            'qty_change' => $request->qty,
            'trans_date' => now()->format('Y-m-d'),
            'priority_status' => $priority
        ]);

        // 📦 Create request (auto-delivered)
        ReqModel::create([
            'dept_id' => $request->dept_id,
            'item_id' => $item->id,
            'qty_request' => abs($request->qty),
            'status' => 'delivered'
        ]);

        // 🧠 Trigger forecasting (DSS)
        ForecastJob::dispatch($item->id, $request->dept_id);

        // 📩 Log notification (mock SMS)
        \Log::info("SMS: {$item->name} updated to {$item->qty}");

        return response()->json($item);
    }
}