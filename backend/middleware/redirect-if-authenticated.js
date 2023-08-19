const redirectIfAuthenticated = (request, response, next) => {
    const { user } = request.session;
  
    if (user !== undefined && user.id !== undefined) {
      response.render("lobby");
    } else {
      next();
    }
  };
  
  module.exports = redirectIfAuthenticated;
  
  /**In summary, response.redirect("/lobby"); is used 
   * to redirect the client to a different URL or route, 
   * triggering a new request, while response.render("lobby"); 
   * is used to render a view or template and send the resulting 
   * HTML as the response without changing the URL. The choice 
   * between these methods depends on the
   *  desired behavior and the specific requirements of your application. */