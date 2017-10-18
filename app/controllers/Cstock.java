package controllers;

import play.db.ebean.EbeanConfig;
import play.libs.Json;
import models.Computer;
import models.Stock;
import play.mvc.Controller;
import play.mvc.Result;
import repository.DatabaseExecutionContext;
import util.ResultRtn;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import io.ebean.Ebean;
import io.ebean.EbeanServer;
public class Cstock extends Controller {
    
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	private final EbeanServer ebeanServer;
    private final DatabaseExecutionContext executionContext;

    @Inject
    public Cstock(EbeanConfig ebeanConfig, DatabaseExecutionContext executionContext) {
        this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
        this.executionContext = executionContext;
    }
	

	    /**
	     * An action that responds with the {@link Counter}'s current
	     * count. The result is plain text. This action is mapped to
	     * <code>GET</code> requests with a path of <code>/count</code>
	     * requests by an entry in the <code>routes</code> config file.
	     */
	    public Result q(String Code) {
	        
//	    	Stock sk=new Stock("600030");
	    	ResultRtn resultRtn = new ResultRtn();
	    	List<Stock> sc =ebeanServer.find(Stock.class).where().eq("code", Code).findList();
	    	resultRtn.errCode = 0;
			resultRtn.business.put("Stock", sc);
	    	
	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
//	    	return ok("--->"+Stock.find.query("code").findUnique().name);
	    	
	    }


}
