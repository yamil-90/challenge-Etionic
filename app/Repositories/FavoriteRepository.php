<?php

namespace HackerNewsClient\Repositories;

use HackerNewsClient\Contracts\IFavoriteRepository;
use Illuminate\Support\Facades\DB;

class FavoriteRepository implements IFavoriteRepository
{

    public function get()
    {
        // TODO: Implement get() method.
    }

    public function store()
    {
        // TODO: Implement store() method.
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
}
