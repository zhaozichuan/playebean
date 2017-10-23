package controllers;

import play.libs.Json;
import models.Stock;
import models.User;
import play.mvc.Controller;
import play.mvc.Result;
import repository.DatabaseExecutionContext;
import util.ResultRtn;

import java.util.List;

import javax.inject.Inject;

import io.ebean.Ebean;
import io.ebean.EbeanServer;
public class Cuser extends Controller {
    
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	

	

	    /**
	     * An action that responds with the {@link Counter}'s current
	     * count. The result is plain text. This action is mapped to
	     * <code>GET</code> requests with a path of <code>/count</code>
	     * requests by an entry in the <code>routes</code> config file.
	     */

	    
	    
         public Result q(String name) {
	        
//	    	Stock sk=new Stock("600030");
	    	ResultRtn resultRtn = new ResultRtn();
	    	List<User> sc =User.find.where().eq("name", name).findList();
	    	resultRtn.errCode = 0;
			resultRtn.business.put("User", sc);
	    	
	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
//	    	return ok("--->"+Stock.find.query("code").findUnique().name);
        	
	    }


}
