<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
// use Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
// use JWTAuth;
use App\Http\Traits\JsonTrait;
use App\Models\User;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    use JsonTrait;
    /**
     * Create a new ApiController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // not a good practice cos have to change many place,
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    public function dashboard($id)
    {
        $dashboard = User::whereId($id)
            ->with(['category', 'task'])
            ->get();

        if (!empty($dashboard)) {
            // return response()->json($dashboard);
            return $this->jsonResponse(
                compact('dashboard'),
                'Fetch dashboard success',
                200
            );
        } else {
            return response()->json([
                "message" => "User not found"
            ], 404);
        }
    }
    /**
     * Register User API.
     * @bodyParam   name    string  required    The name of the  user.      Example: John Doe
     * @bodyParam   email    string  required    The email of the  user.      Example: user@example.com
     * @bodyParam   password    string  required    The password of the  user.   Example: password
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }
    /**
     * Login API
     *
     * @bodyParam   email    string  required    The email of the  user.      Example: superadmin@invoke.com
     * @bodyParam   password    string  required    The password of the  user.   Example: password
     *
     * @response {
     *  "access_token": {{token}},
     *  "token_type": "Bearer",
     * }
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
            // Error 422 = parameter / application error code
        }

        if (!$token = JWTAuth::attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }
    /**
     * Log the user out (Invalidate the token).
     * 
     * @bodyParam   email    string  required    The email of the  user.      Example: superadmin@invoke.com
     * @bodyParam   password    string  required    The password of the  user.   Example: password
     * 
     * @authenticated
     * @header Authorization Bearer {{token}}
     * @reponse 401 scenario="invalid token"
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }
    /**
     * Get the authenticated User.
     *
     * @bodyParam   email    string  required    The email of the  user.      Example: superadmin@invoke.com
     * @bodyParam   password    string  required    The password of the  user.   Example: password
     * @authenticated
     * @header Authorization Bearer {{token}}
     * @reponse 401 scenario="invalid token"
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        return response()->json(auth()->user());
    }
    /**
     * Get Category API.
     * 
     * @urlParam masukkan user_id integer who create the categories in the TOP box

     * @authenticated
     * @header Authorization Bearer {{token}}
     * 
     * @return \Illuminate\Http\JsonResponse
     */

    public function getCategory($id)
    {
        $category = Category::where('user_id', $id)->get();
        if (!empty($category)) {
            return response()->json($category);
        } else {
            return response()->json([
                "message" => "Category not found"
            ], 404);
        }
    }
    /**
     * Create Category API.
     * category status by default is 1: active. if delete change to 2:delete
     * 
     * @return void
     *

     * @return \Illuminate\Http\JsonResponse
     */

    public function createCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'list' => 'required|string|between:2,100|unique:categories',
            'user_id' => 'required|integer',
            'status' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $category = Category::create(
            $validator->validated(),
        );

        return response()->json([
            'message' => 'Category successfully registered',
            'category' => $category
        ], 201);
    }
    /**
     * Update/Edit/Soft Delete Category API.
     * category status by default is 1: active. if delete change to 2:delete
     * 
     * @return void
     *

     * @return \Illuminate\Http\JsonResponse
     */

    public function updateCategory(Request $request, $id)
    {
        if (Category::where('id', $id)->exists()) {
            $category = Category::find($id);
            $category->list = is_null($request->list) ? $category->list : $request->list;
            $category->status = is_null($request->status) ? $category->status : $request->status;
            $category->save();
            return response()->json([
                "message" => "Category Updated."
            ], 201);
        } else {
            return response()->json([
                "message" => "Category Not Found."
            ], 404);
        }
    }
    /**
     * Create Task API.
     * task status by default is 1: active. if delete change to 2:delete
     * 
     * @bodyParam   name    string  required    The category name.      Example: Finish coding
     * @bodyParam   user_id    number  required    The user id.      Example: 2
     * @bodyParam   status   number  required    The task status.   Example: 1
     * @bodyParam   category_id    number  required    The category id.      Example: 1
     *
     * 
     * @return \Illuminate\Http\JsonResponse
     */

    public function createTask(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100|unique:tasks',
            'user_id' => 'required|integer',
            'status' => 'required|integer',
            'category_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $task = Task::create(
            $validator->validated(),
        );

        return response()->json([
            'message' => 'Task successfully registered',
            'task' => $task
        ], 201);
    }
    /**
     * Get Task API.
     * 
     * @urlParam masukkan user_id integer who create the categories in the TOP box

     * @authenticated
     * @header Authorization Bearer {{token}}
     * 
     * @return \Illuminate\Http\JsonResponse
     */

    public function getTask($id)
    {
        $task = Task::where('category_id', $id)->get();

        if (!empty($task)) {
            return response()->json($task);
        } else {
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }
    /**
     * Get Pending Task API.
     * 
     * @urlParam masukkan user_id integer who create the categories in the TOP box

     * @authenticated
     * @header Authorization Bearer {{token}}
     * 
     * @return \Illuminate\Http\JsonResponse
     */

    public function getPendingTask($id)
    {
        $task = Task::where('category_id', $id)->where('status', 1)->get();
        if (!empty($task)) {
            return response()->json($task);
        } else {
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }
    /**
     * Get Complete Task API.
     * 
     * @urlParam masukkan user_id integer who create the categories in the TOP box

     * @authenticated
     * @header Authorization Bearer {{token}}
     * 
     * @return \Illuminate\Http\JsonResponse
     */

    public function getCompleteTask($id)
    {
        $task = Task::where('category_id', $id)->where('status', 2)->get();
        if (!empty($task)) {
            return response()->json($task);
        } else {
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }

    public function pendingTaskCountGroupByDate($id)
    {
        $taskCount = DB::table('tasks')
            ->select(array(
                DB::raw('Date(tasks.created_at) day'), 'tasks.status AS task_stat', 'tasks.category_id', 'categories.status AS category_stat',
                DB::raw("COUNT(tasks.id)")
            ))->join('categories', 'categories.id', '=', 'tasks.category_id')
            ->where('categories.user_id', '=', $id)
            ->where('categories.status', '=', '1')
            ->where('tasks.status', '=', '1')
            ->groupBy('day')
            ->orderBy('tasks.created_at')
            ->get();
        if (!empty($taskCount)) {
            // return response()->json($dashboard);
            return $this->jsonResponse(
                compact('taskCount'),
                'Fetch pending task count group by date successed',
                200
            );
        } else {
            return response()->json([
                "message" => "Task Count not successful"
            ], 404);
        }
    }
    public function completeTaskCountGroupByDate($id)
    {
        $taskCount = DB::table('tasks')
            ->select(array(
                DB::raw('Date(tasks.created_at) day'), 'tasks.status AS task_stat', 'tasks.category_id', 'categories.status AS category_stat',
                DB::raw("COUNT(tasks.id)")
            ))->join('categories', 'categories.id', '=', 'tasks.category_id')
            ->where('categories.user_id', '=', $id)
            ->where('categories.status', '=', '1')
            ->where('tasks.status', '=', '2')
            ->groupBy('day')
            ->orderBy('tasks.created_at')
            ->get();
        if (!empty($taskCount)) {
            // return response()->json($dashboard);
            return $this->jsonResponse(
                compact('taskCount'),
                'Fetch complete task count group by date successed',
                200
            );
        } else {
            return response()->json([
                "message" => "Task Count not successful"
            ], 404);
        }
    }
    public function pendingTaskCountGroupByCategory($id)
    {
        $taskCount = DB::table('tasks')
            ->select(array(
                'tasks.category_id', 'categories.list AS category_name', 'categories.status AS category_stat',
                DB::raw("COUNT(tasks.id) AS count")
            ))->join('categories', 'categories.id', '=', 'tasks.category_id')
            ->where('categories.user_id', '=', $id)
            ->where('tasks.status', '=', '1')
            ->where('categories.status', '=', '1')
            ->groupBy(DB::raw("categories.id"))
            ->get();
        if (!empty($taskCount)) {
            // return response()->json($dashboard);
            return $this->jsonResponse(
                compact('taskCount'),
                'Fetch pending task count group by category is successful!',
                200
            );
        } else {
            return response()->json([
                "message" => "pending Task Count not successful!"
            ], 404);
        }
    }
    public function completeTaskCountGroupByCategory($id)
    {
        $taskCount = DB::table('tasks')
            ->select(array(
                'tasks.category_id', 'categories.list AS category_name', 'categories.status AS category_stat',
                DB::raw("COUNT(tasks.id) AS count")
            ))->join('categories', 'categories.id', '=', 'tasks.category_id')
            ->where('categories.user_id', '=', $id)
            ->where('tasks.status', '=', '2')
            ->where('categories.status', '=', '1')
            ->groupBy(DB::raw("categories.id"))
            ->get();
        if (!empty($taskCount)) {
            // return response()->json($dashboard);
            return $this->jsonResponse(
                compact('taskCount'),
                'Fetch completed task count group by category is successful!',
                200
            );
        } else {
            return response()->json([
                "message" => "Completed Task Count not successful!"
            ], 404);
        }
    }
    /**
     * Update/Edit/Soft Delete Task API.
     * category status by default is 1: active. if delete change to 2:delete
     * 
     * @return void
     *

     * @return \Illuminate\Http\JsonResponse
     */

    public function updateTask(Request $request, $id)
    {
        if (Task::where('id', $id)->exists()) {
            $task = Task::find($id);
            $task->name = is_null($request->name) ? $task->name : $request->name;
            $task->status = is_null($request->status) ? $task->status : $request->status;
            $task->save();
            return response()->json([
                "message" => "Task Updated."
            ], 201);
        } else {
            return response()->json([
                "message" => "Task Not Found."
            ], 404);
        }
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return $this->jsonResponse(
            [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 60,
                'user' => auth()->user()
            ],
            "Invalid Input Parameters", 
            200
        );
    }
}
