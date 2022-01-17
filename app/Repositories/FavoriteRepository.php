<?php

namespace App\Repositories;

use App\Contracts\IFavoriteRepository;
use App\Models\Favorites;
use Illuminate\Support\Facades\DB;

class FavoriteRepository implements IFavoriteRepository
{

    public function getAll(int $user_id)
    {
        try {
            $favorites = DB::table('favorites')
                ->select('link_id', 'link', 'title')
                ->where('user_id', '=', $user_id)
                ->get();
            return $favorites;

        } catch (\Exception $e) {
            logger($e);
            return [];
        }

    }

    public function store(string $title, string $link, int $user_id, int $link_id) : bool
    {
        $input = [
            "title" => $title,
            "link" => $link,
            "user_id" => $user_id,
            "link_id" => $link_id
        ];
        try {

            Favorites::create($input);
            return true;

        } catch (\Exception $e) {
            logger($e);
            return false;
        }


    }

    public function remove(int $user_Id, int $link_Id): bool
    {
        try {
            DB::table('favorites')
                ->where('user_id', '=', $user_Id)
                ->where('link_id', '=', $link_Id)
                ->delete();
            return true;

        } catch (\Exception $e) {
            logger($e);
            return false;
        }
    }

    public function get(int $user_Id, int $link_Id)
    {
        try {
            return DB::table('favorites')
                ->where('user_id', '=', $user_Id)
                ->where('link_id', '=', $link_Id)
                ->get();
        } catch (\Exception $e) {
            logger($e);
            return false;
        }
    }
}
