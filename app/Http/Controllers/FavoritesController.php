<?php

namespace App\Http\Controllers;

use App\Models\Favorites;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FavoritesController extends Controller
{
    //
    public function getFavorites(Request $request)
    {
        dd($request);
        $favorites = DB::table('favorites')
            ->select('link_id')
            ->where('user_id', '=', $inputs->user_id)
            ->get();
        return $favorites;
    }

    public function storeFavorite(Request $request)
    {
        $message = ['status' => 'error'];
        $status = 500;
//
            try {
                $inputs = $request->validate([
                    'title' => 'required',
                    'link' => 'required',
                    'user_id' => 'required',
                    'link_id' => 'required'
                ]);
                Favorites::create($inputs);
                $message = ['status' => 'ok'];
                $status = 201;

            } catch (\Exception $e) {
                logger($e);
                $message['status'] = $e->getMessage();
            }


        return response()->json($message, $status);

    }

    public function removeFavorites(Request $request)
    {
        $message = ['status' => 'error deleting'];
        $status = 500;
        try {
            $inputs = $request->validate([
                'title' => 'required',
                'link' => 'required',
                'user_id' => 'required',
                'link_id' => 'required'
            ]);
            $favorites = DB::table('favorites')->where('user_id', '=', $request->user_id)->where('link_id', '=', $request->link_id)->get();
            $favorites->delete();
            $message = ['status' => 'deleted'];
            $status = 201;

        } catch (\Exception $e) {
            logger($e);
            $message['status'] = $e->getMessage();
        }
        return response()->json($message, $status);

    }
}
