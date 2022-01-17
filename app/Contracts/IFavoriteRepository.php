<?php

namespace HackerNewsClient\Contracts;

interface IFavoriteRepository
{
    public function get();
    public function store();
    public function remove(int $userId, int $linkId) : bool;

}
