$(document).ready(function(){

	/**
	* Garuda Javascript Query
	*
	* Method that used :
	* _getValById("");
	* _getById("");
	* _loadDoc("");
	* _printTo("");
	* _clear("");
	* _focus("");
	* _onClick("");
	*/
	var user_input;

	function clearAll()
	{
		/**
		* clear div object
		*/
		_clear("id_user",true);
		_clear("location_user",true);
		_clear("quote_user",true);
		_clear("company_user",true);
		_setImage("img_avatar","user.png");
		_clear("blog_user",true);
		_clear("message",true);
		_clear("username",true);
		_clear("repo_user",true);
		_clear("follower_user",true);
		_clear("subscriber_user",true);
		_clear("dis_f",true);
	}
	


	function getProfileUser()
	{
			clearAll();

			user_input = _getValById("user_input");

			if (user_input)
			{

				_printTo("btn_proses","Please Wait...");
				/**
				 * [_loadDoc Ajax Request Load Document]
				 * @URL  {String} "https://api.github.com/users/username"				
				 * @return {[response.Text]}  
				 */
				 btn_proses.disabled = true;
				_loadDoc("https://api.github.com/users/"+user_input+"",function(res)
				{
						 btn_proses.disabled = false;
						_printTo("btn_proses","Load");
						/**
						 * res == Checking if status 404
						 * @type {[boolean]}
						 */
						if (res===false)
						{
							/**
							 * show alert of bootstrap
							 */
							_writeAlert("message","User not found !","danger");
							_focus("user_input");
							return;
						}
						/**
						 * JSON Parse
						 * obj {[obj]}
						 */
						var obj 		= JSON.parse(res);
						var id       	= obj.id;
						var username 	= obj.login;
						var location 	= obj.location;
						var company  	= obj.company;
						var quote 		= obj.bio;
						var avatar   	= obj.avatar_url;
						var blog 		= obj.blog;
						var repo     	= obj.public_repos;
						var follower    = obj.followers_url;
						var subscriber  = obj.subscriptions_url;
						var followers   = obj.followers;
						var html_url    = obj.html_url;

						/**
						 * _printTo("","") === document.getElementById("").innerHTML ="";
						 */
						_printTo("id_user",id);
						_printTo("location_user",location);
						_printTo("quote_user",quote);
						_printTo("company_user",company);
				        _setImage("img_avatar",avatar);
						_printTo("blog_user","<a href='"+blog+"' target='_blank'>"+blog+"</a>");
						_printTo("username","<a href='"+html_url+"' target='_blank'>"+username+"</a>");
						_printTo("repo_user",repo);
						_printTo("dis_f",followers);

						_printTo("follower_user",'</br><button id="my_follower" name="'+follower+'" class="btn btn-success xs">Open</button>');
						_printTo("subscriber_user",'</br><button id="my_subscriber" name="'+subscriber+'" class="btn btn-success xs">Open</button>');

						_onClick("my_follower",function(){
							runModal(follower,1);
						});
						_onClick("my_subscriber",function(){
							runModal(subscriber,2);
						});

						_focus("user_input");

				});

				function runModal(u,ty)
				{
					$('#_myModal').modal('show');
					if (ty==1)
					{
						_printTo('my_title',"Followers ");
						_animation("display_result","Please Wait...");
						_loadDoc(u,function(res){
							if (res===false)
							{
								alert("Response 404 !");
								return;
							}
							else
							{
								 var obj = JSON.parse(res);

								 if (obj)
								 {
								 	var template = '<div class="table-responsive"><table class="table table-bordered"><thead> <tr> <th>No</th> <th>ID</th> <th> Username Github </th> <th> API Repository </th> <th>API Organization</th> </tr> </thead> <tbody>'; 

									var j =1;
									for (var i = 0, len = obj.length; i < len; ++i)
									 {
										var id = obj[i].id;
										var username = obj[i].login;
										var repo = obj[i].repos_url;
										var avatar = obj[i].avatar_url;
										var org = obj[i].organizations_url;
										
									    template += ' <tr><td>'+j+'</td> <td>'+id+'</td> <td><center><a href="https://github.com/'+username+'" target="_blank">'+username
									    											+'</a> </br><img src="'+avatar+'" width="60" height="60" class="img-thumbnail"></img></center> </td> <td><a href="'
									    											+repo+'" target="_blank">'+repo+'</a></td> <td><a href="'+org+'" target="_blank">'+org+'</a></td> </tr>'; 
										j++;
									}
									    template += ' </tbody> </table></div>'; 
									 _printTo("display_result",template);
								 }
							
							}
						});
					}
					else if (ty==2)
					{
						_printTo('my_title',"Subscriber ");
						_animation("display_result","Please Wait...","circle");

						_loadDoc(u,function(res){
							if (res===false)
							{
								alert("Response 404 !");
								return;
							}
							else
							{
								 var obj = JSON.parse(res);

								 if (obj)
								 {
								 	var template = '<div class="table-responsive"><table class="table table-bordered"><thead> <tr> <th>No</th> <th>ID</th> <th>Name</th> <th>Full Name</th><th>Size</th> <th>API Repository</th> </tr> </thead> <tbody>'; 
									var j =1;
									for (var i = 0, len = obj.length; i < len; ++i)
									 {
										var id = obj[i].id;
										var username = obj[i].name;
										var full_name = obj[i].full_name;
										var size = obj[i].size;
										var r_url = obj[i].url;
										
									    template += ' <tr><td>'+j+'</td> <td>'+id+'</td> <td>'+username+'</td> <td>'+full_name+'</td> <td>'+size+'</td> <td><a href="'+r_url+'" target="_blank">open</a></td> </tr>'; 
									    j++;
									}
								    template += ' </tbody> </table></div>'; 
									 _printTo("display_result",template);
								 }
							
							}
						});
					}
					
					
				}
		}
		else
		{
			_focus("user_input");
			_writeAlert("message","Upzz you have to type the username","danger"); 
		}
	}
	/**
	* set focus to input text
	*/
	_focus("user_input");


	clearAll();

	_onClick("btn_proses",function(){
		getProfileUser();
	});

	
	_keyCustom(function(){
		getProfileUser();
	},_keyCode.enter);

	_keyCustom(function(){
		getProfileUser();
	},_keyCode.insert);


	_setValue("user_input","BrendanEich");
});
