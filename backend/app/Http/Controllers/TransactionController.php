<?php

namespace App\Http\Controllers;

use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['item', 'dept'])
            ->latest()
            ->limit(10)
            ->get();

        return $transactions->map(function ($t) {
            return [
                'id' => $t->id,
                'item' => $t->item ? $t->item->name : 'Unknown',
                'dept' => $t->dept ? $t->dept->name : 'Unknown',
                'qty_change' => $t->qty_change,
                'time' => $t->trans_date,
            ];
        });
    }
}