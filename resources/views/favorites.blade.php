@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                </div>
                <div id="mainApp">main react app</div>
                @auth()
                    <script>
                        window.userId = {{auth()->user()->id}}
                            window.userToken = '{!! $userToken !!}'
                        window.favoritesIdArray =
                        {!!$favoritesIdArray!!}
                    </script>
                @endauth
            </div>
        </div>
    </div>
@endsection
