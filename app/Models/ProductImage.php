<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;
    protected $fillable = [
        'productId',
        'path'
    ];
    public function getPathAttribute(){
        return asset($this->attributes['path']);
    }
}
