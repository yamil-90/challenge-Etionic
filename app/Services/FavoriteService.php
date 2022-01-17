<?php

namespace App\Services;

use App\Repositories\FavoriteRepository;

class FavoriteService
{
    public $repo;

    public function __construct()
    {
        $this->repo = new FavoriteRepository();
    }

    public function getAll(int $user_id)
    {
        return $this->repo->getAll($user_id);
    }

    public function store(string $title, string $link, int $user_id, int $link_id)
    {
        if ($this->repo->get($user_id, $link_id) > 0) {
            return false;
        }

        return $this->repo->store($title, $link, $user_id, $link_id);
    }

    public function remove(int $userId, int $linkId): bool
    {
        return $this->repo->remove($userId, $linkId);
    }

}
