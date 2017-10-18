package controllers;


import models.Stock;
import play.mvc.Controller;
import play.mvc.Result;

public class T extends Controller {
    
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	
	

	    /**
	     * An action that responds with the {@link Counter}'s current
	     * count. The result is plain text. This action is mapped to
	     * <code>GET</code> requests with a path of <code>/count</code>
	     * requests by an entry in the <code>routes</code> config file.
	     */
	    public Result count() {
	        
	    	Stock sk=new Stock("600030");
	    	
	    	
	    	return ok("--->"+Stock.find.byId("200").name);
	    }


}
