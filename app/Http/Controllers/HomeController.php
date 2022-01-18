<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = auth()->user();

        $token = JWTAuth::fromUser($user);
        $favoritesIdArray = DB::table('favorites')
            ->select('link_id')
            ->where('user_id', '=', auth()->user()->id)
            ->pluck('link_id')
            ->toJson();

        return view('home', ['favoritesIdArray' => $favoritesIdArray, 'userToken'=>$token]);
    }
}
