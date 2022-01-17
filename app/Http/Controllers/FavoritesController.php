<?php

namespace App\Http\Controllers;

use App\Models\Favorites;
use FavoriteService;
use HackerNewsClient\Repositories\FavoriteRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoritesController extends Controller
{
    private $service;

    public function __construct()
    {
        $repository = new FavoriteRepository();
        $this->service = new FavoriteService($repository);
    }


    public function getFavorites(Request $request)
    {
        $favorites = DB::table('favorites')
            ->select('link_id', 'link', 'title')
            ->where('user_id', '=', $request->user_id)
            ->get();
        return $favorites;
    }

    public function storeFavorite(Request $request)
    {
        $message = ['status' => 'store error'];
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
         $request->validate([
                'user_id' => 'required',
                'link_id' => 'required'
            ]);

         if($this->service->remove($request->user_id, $request->link_id)) {
             $message = ['status' => 'deleted'];
             $status = 200;
         }

        return response()->json($message, $status);

    }
}
