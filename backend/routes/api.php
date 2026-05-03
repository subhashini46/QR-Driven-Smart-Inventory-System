<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ForecastController;
use App\Http\Controllers\DeptController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\TransactionController;

Route::get('/items', [ItemController::class, 'index']);
Route::post('/items/scan', [ItemController::class, 'scan']);  // QR add-on

Route::get('/forecast', [ForecastController::class, 'index']);  // Priority list
Route::post('/forecast/run', [ForecastController::class, 'run']);

Route::get('/depts', [DeptController::class, 'index']);
Route::post('/depts', [DeptController::class, 'store']);

Route::post('/requests', [RequestController::class, 'store']);  // PR creation
Route::get('/transactions', [TransactionController::class, 'index']);
Route::get('/api/items', [ItemController::class, 'index']);