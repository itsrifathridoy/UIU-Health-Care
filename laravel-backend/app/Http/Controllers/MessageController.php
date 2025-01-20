<?php

namespace App\Http\Controllers;

use App\Events\CallingNotificationEvent;
use App\Events\MessageReceiveEvent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class MessageController extends Controller
{


    public function sendMessage(Request $request)
    {


        $validate = $request->validate([
            'content' => 'required',
            'receiver_id' => 'required',
            'filePath' => 'nullable',
            'timestamp' => 'required',
        ]);

        if($validate['filePath'] == null){
            $validate['filePath'] = '';
        }

        $validate['sender_id'] = auth()->user()->id;


        // ranomly generate a number
        $id = rand(1000, 99999999999999);
        $validate['id'] = $id;

        DB::table('messages')->insert($validate);

        $validate['sender_name'] = auth()->user()->name;



        broadcast(new MessageReceiveEvent($validate));


//        return response()->json(['message' => 'Message sent successfully'], 200);


    }

    public function searchUsers(Request $request)
    {
        //get query from query params
        $search = $request['q'];
        $users = DB::table('users')->where('name', 'like', '%' . $search . '%')->get();
        return response()->json(['users' => $users], 200);
    }
}
