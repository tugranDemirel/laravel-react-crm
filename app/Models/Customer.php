<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $appends = ['customerTypeString'];
    const ACCOUNT_TYPE_CUSTOMER = 1;
    const ACCOUNT_TYPE_SUPPLIER = 0;
    public function getCustomerTypeStringAttribute()
    {
        switch ($this->attributes['customerType']){
            case self::ACCOUNT_TYPE_SUPPLIER:
                return 'Tedarikçi';
            break;
            case self::ACCOUNT_TYPE_CUSTOMER:
                return 'Müşteri';
            break;

        }
    }

}
