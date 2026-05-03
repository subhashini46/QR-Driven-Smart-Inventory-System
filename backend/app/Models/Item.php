<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'qty', 'qr_code', 'dept_id'];

    public function dept() { return $this->belongsTo(Dept::class); }
    public function requests() { return $this->hasMany(Request::class); }
    protected $guarded = []; // or just use fillable above

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function forecast()
    {
        return $this->hasOne(Forecast::class);
    }
}
