<?php

namespace App\Http\Controllers;

use App\Models\Favorites;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoritesController extends Controller
{
    public function favoritesIndex()
    {
        return view('favorites');
    }


    public function getFavorites(Request $request)
    {

        $favorites = DB::table('favorites')
            ->select('link_id', 'link')
            ->where('user_id', '=', $request->user_id)
            ->get();
        return $favorites;
    }

    public function storeFavorite(Request $request)
    {
        $message = ['status' => 'error'];
        $status = 500;
            try {
                $inputs = $request->validate([
                    'title' => 'required',
                    'link' => '',
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

    public function deleteFavorite(Request $request)
    {
        $message = ['status' => 'error deleting'];
        $status = 500;
        try {
            $request->validate([
                'user_id' => 'required',
                'link_id' => 'required'
            ]);
            DB::table('favorites')->where('user_id', '=', $request->user_id)->where('link_id', '=', $request->link_id)->delete();

            $message = ['status' => 'deleted'];
            $status = 201;

        } catch (\Exception $e) {
            logger($e);
            $message['status'] = $e->getMessage();
        }
        return response()->json($message, $status);

    }
}
