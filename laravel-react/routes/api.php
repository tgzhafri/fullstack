<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::post('/login', [ApiController::class, 'login'])->name('api.login');
// Route::post('/register', [ApiController::class, 'register'])->name('api.register');
// Route::post('/logout', [ApiController::class, 'logout'])->name('api.logout');
// Route::post('/userProfile', [ApiController::class, 'userProfile'])->name('api.userProfile');
// Route::post('/createCategory', [ApiController::class, 'createCategory'])->name('api.createCategory');
// Route::post('/createTask', [ApiController::class, 'createTask'])->name('api.createTask');


Route::group([
    'middleware' => 'api',

], function () {
    Route::post('/dashboard/{id}', [ApiController::class, 'dashboard']);
    Route::post('/pendingTaskCountGroupByDate/{id}', [ApiController::class, 'pendingTaskCountGroupByDate']);
    Route::post('/completeTaskCountGroupByDate/{id}', [ApiController::class, 'completeTaskCountGroupByDate']);
    Route::post('/pendingTaskCountGroupByCategory/{id}', [ApiController::class, 'pendingTaskCountGroupByCategory']);
    Route::post('/completeTaskCountGroupByCategory/{id}', [ApiController::class, 'completeTaskCountGroupByCategory']);
    Route::post('/login', [ApiController::class, 'login']);
    Route::post('/register', [ApiController::class, 'register']);
    Route::post('/logout', [ApiController::class, 'logout']);
    Route::post('/userProfile', [ApiController::class, 'userProfile']);
    Route::post('/createCategory', [ApiController::class, 'createCategory']);
    Route::post('/getCategory/{id}', [ApiController::class, 'getCategory']);
    Route::post('/updateCategory/{id}', [ApiController::class, 'updateCategory']);
    Route::post('/createTask', [ApiController::class, 'createTask']);
    Route::post('/getTask/{id}', [ApiController::class, 'getTask']);
    Route::post('/getPendingTask/{id}', [ApiController::class, 'getPendingTask']);
    Route::post('/getCompleteTask/{id}', [ApiController::class, 'getCompleteTask']);
    Route::post('/updateTask/{id}', [ApiController::class, 'updateTask']);
});
