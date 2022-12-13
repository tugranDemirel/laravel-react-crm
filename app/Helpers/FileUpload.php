<?php
namespace App\Helpers;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManagerStatic as Image;

class FileUpload{

    static function newUpload($name,$directory,$file,$type = 0){

        $dir = 'files/'.$directory.'/'.$name;
        if(!empty($file)){
            if(!File::exists($dir)){
                File::makeDirectory($dir,0755,true);
            }
            $filename = rand(1,900000).".".$file->getClientOriginalExtension();

            if($type == 0){
                $path = public_path($dir."/".$filename);
                Image::make($file->getRealPath())->save($path);
            }
            else
            {
                $path = public_path($dir."/");
                $file->move($path,$filename);
            }
            return $dir."/".$filename;
        }
        else
        {
            return "";
        }
    }

       /*                     // isim, dosya, yolu, resim ya da dosya ayırt etme
    static function newUpload($name, $directory, $file, $type = 0){
        $dir = 'files/'.$directory.'/'.$name;
        // gönderilen dosya var mı yok mu kontrol et
        if(!empty($file)){
            // oluşturduğumuz dir dizini yoksa
            if (!File::exists($dir)){
                // ilgili dosyayı oluştur
                File::make($dir, 0755, true);
            }
            $filename = rand(1, 999999).".".$file->getClientOriginalExtension();
            // resim ise
            if ($type == 0){
                $path = public_path($dir.'/'.$filename);
                Image::make($file->getRealPath())->save($path);
            }else{
                $path = public_path($dir.'/');
                $file->move($path, $filename);
            }
            return $dir.'/'.$filename;
        }
        else{
            return "";
        }
    }*/
}
