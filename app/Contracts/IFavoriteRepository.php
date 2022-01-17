<?php

namespace App\Contracts;

interface IFavoriteRepository
{
    public function getAll(int $user_id);
    public function get(int $user_id, int $link_id);
    public function store(string $title, string $link, int $user_id, int $link_id);
    public function remove(int $user_Id, int $link_Id) : bool;

}
