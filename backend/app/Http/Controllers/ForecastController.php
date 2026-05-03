<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\Forecast;

class ForecastController extends Controller
{
    public function index()  // GET /api/forecast → Priority list report (Section IV)
    {
        $forecasts = Forecast::with(['item', 'dept'])->latest('generated_at')->get();
        $priorityList = $forecasts->map(function ($f) {
            return [
                'dept' => $f->dept->name,
                'item' => $f->item->name,
                'reorder' => $f->reorder_point,
                'status' => $f->priority_status
            ];
        });
        return response()->json(['priority_list' => $priorityList]);
    }

    public function run(Request $r)  // POST /api/forecast/run → Manual/Job trigger (descriptive algo [[3]])
    {
        $r->validate(['id' => 'required|exists:items,id', 'dept_id' => 'required|exists:depts,id']);
        $item = Item::find($r->id);
        $deptId = $r->dept_id;

        // Paper's descriptive: Freq analysis on historical qty_change per item/dept
        $hist = Transaction::where('item_id', $item->id)->where('dept_id', $deptId)->pluck('qty_change');
        $freq = $hist->count() > 0 ? $hist->sum() / $hist->count() : 0;  // Avg freq for on-demand
        $lead = 7;  // Days lead time (paper's forecast period)
        $reorder = ceil($freq * $lead);
        $status = ($reorder > $item->qty) ? 'high' : (($reorder > $item->qty / 2) ? 'medium' : 'low');  // On-demand priority logic

        Forecast::updateOrCreate(
            ['item_id' => $item->id, 'dept_id' => $deptId],
            ['reorder_point' => $reorder, 'priority_status' => $status, 'generated_at' => now()]
        );

        return response()->json([
            'reorder' => $reorder,
            'priority' => $status,
            'list_item' => $item->name . ' for Dept ' . \App\Models\Dept::find($deptId)->name
        ]);
    }
}