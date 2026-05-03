<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forecast extends Model
{
    use HasFactory;

    protected $fillable = ['item_id', 'dept_id', 'reorder_point', 'priority_status', 'generated_at'];

    public function dept() { return $this->belongsTo(Dept::class); }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}