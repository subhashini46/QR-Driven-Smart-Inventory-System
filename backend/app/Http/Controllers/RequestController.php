<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Request as ReqModel;

class RequestController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'dept_id' => 'required|exists:depts,id',
            'item_id' => 'required|exists:items,id',
            'qty_request' => 'required|integer'
        ]);
        return ReqModel::create($request->all());
    }
}