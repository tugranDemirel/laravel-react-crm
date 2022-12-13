<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'userId',
        'categoryId',
        'name',
        'modelCode',
        'barcode',
        'brand',
        'stock',
        'image',
        'text',
        'buyingPrice',
        'sellingPrice',
        'tax',

    ];
}
