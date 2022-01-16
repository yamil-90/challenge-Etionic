<?php

namespace App\Http\Controllers;

use App\Models\Favorites;
use Illuminate\Http\Request;

class FavoritesController extends Controller
{
    //
    public function getFavorites()
    {
        $favorites = auth()->user()->favorites();
        return $favorites;
    }

    public function storeFavorite(Request $request)
    {
        $message = ['status' => 'error'];
        $status = 500;
        try {
            $inputs = $request->validate([
                'title' => 'required',
                'link' => 'required',
                'user_id' => 'required'
            ]);
            Favorites::create($inputs);
            $message = ['status' => 'ok'];
            $status = 201;

        } catch (\Exception $e) {
            logger($e);
        }
        return response()->json($message, $status);

    }

    public function removeFavorites($id)
    {
        $favorites = Favorites::where('id', '==', $id);
        $favorites->delete();
    }
}
