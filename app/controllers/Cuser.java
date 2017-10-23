package controllers;

import play.db.ebean.EbeanConfig;
import play.libs.Json;
import models.Stock;
import models.User;
import play.mvc.Controller;
import play.mvc.Result;
import repository.DatabaseExecutionContext;
import util.ResultRtn;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import io.ebean.Ebean;
import io.ebean.EbeanServer;


public class Cuser extends Controller {
    
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	

	private final EbeanServer ebeanServer;

    @Inject
    public Cuser(EbeanConfig ebeanConfig, DatabaseExecutionContext executionContext) {
        this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
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
	    	List<User> sc =ebeanServer.find(User.class).where().eq("name", name).findList();
	    	
	    	
	    	resultRtn.errCode = 0;
			resultRtn.business.put("User", sc);
	    	
	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
//	    	return ok("--->"+Stock.find.query("code").findUnique().name);
        	
	    }
         
         
         public Result myStockList(String mid,String userId) {
        	 User  uc =null;
 	    	ResultRtn resultRtn = new ResultRtn();
 	               uc =ebeanServer.find(User.class).where().eq("userId", userId)
                     				.findUnique();
 	       Stock s=new Stock("");
 	       List<Stock> sc = new ArrayList<Stock>();
 	       
 	        if(uc==null)
 	        {
 	        	sc.add(s);
 	        
 	        }else{
 	            
 	        	sc =uc.stocks;
 	        }
 	    	
 	        resultRtn.errCode = 0;
 			resultRtn.business.put("Stock", sc);
 	    	
 	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
         	
 	    }


}
