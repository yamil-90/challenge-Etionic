<?php

namespace App\Http\Controllers;

use App\Services\FavoriteService;
use Illuminate\Http\Request;

class FavoritesController extends Controller
{
    private $service;

    public function __construct()
    {
        $this->service = new FavoriteService();
    }


    public function getFavorites(Request $request)
    {
        $favorites = $this->service->getAll($request->user_id);
        return $favorites;
    }

    public function storeFavorite(Request $request)
    {
        $message = ['status' => 'store error'];
        $status = 500;

        $request->validate([
            'title' => 'required',
            'link' => '',
            'user_id' => 'required',
            'link_id' => 'required'
        ]);
        if ($this->service->store($request->title, $request->link, $request->user_id, $request->link_id)) {
            $message = ['status' => 'Entry saved successfully'];
            $status = 201;
        }

        return response()->json($message, $status);
    }

    public function deleteFavorite(Request $request)
    {
        $message = ['status' => 'delete error'];
        $status = 500;
        $request->validate([
            'user_id' => 'required',
            'link_id' => 'required'
        ]);

        if ($this->service->remove($request->user_id, $request->link_id)) {
            $message = ['status' => 'Entry deleted successfully'];
            $status = 200;
        }

        return response()->json($message, $status);
    }
}
