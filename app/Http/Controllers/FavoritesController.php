<?php

namespace App\Http\Controllers;

use App\Models\Favorites;
use Illuminate\Http\Request;

class FavoritesController extends Controller
{
    //
    public function getFavorites(){
        $favorites = auth()->user()->favorites();
        return $favorites;
    }

    public function storeFavorite(Request $request){
        return 'testing';
//        $inputs = $request ->validate([
//            'title'=>'required',
//            'link'=>'required',
//        ]);
//        $inputs->user_id = auth()->user()->id;
//        auth()->user()->favorites()->create($inputs);
    }

    public function removeFavorites($id){
        $favorites = Favorites::where('id', '==', $id );
        $favorites->delete();
    }
}
