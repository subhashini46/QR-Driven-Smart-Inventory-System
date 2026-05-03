<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dept;

class DeptController extends Controller
{
    public function index()
    {
        return Dept::all();  // List depts for dropdowns
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:100']);
        return Dept::create($request->all());
    }
}