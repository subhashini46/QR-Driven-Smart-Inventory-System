<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'item_id',
        'dept_id',
        'qty_change',
        'trans_date',
        'priority_status'
    ];

    // 🔥 ADD THIS
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function dept()
    {
        return $this->belongsTo(Dept::class);
    }
}