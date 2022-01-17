<?php

namespace HackerNewsClient\Services;

use HackerNewsClient\Contracts\IFavoriteRepository;

class FavoriteService
{
    public $repo;
    public function __construct(IFavoriteRepository $repo)
    {
        $this->repo = $repo;
    }
    public function remove(int $userId, int $linkId) : bool
    {
        return $this->repo->remove($userId, $linkId);
    }

}
