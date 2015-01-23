using System;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using EF.Web.Unity;
using EFSchools.Englishtown.Bella.Deployment.Platform;
using Microsoft.Practices.Unity;

namespace EFSchools.Englishtown.Bella.CMS.UI
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode,
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : UnityHttpApplication
    {
        protected override void OnApplicationStart()
        {
            var deployment = Container.Resolve<IDeploymentProvider>().Provide();
            deployment.Deploy(Container);

            //regiseter others
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            //set all response to json format
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SupportedMediaTypes.Add(new System.Net.Http.Headers.MediaTypeHeaderValue("text/html"));
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SupportedMediaTypes.Add(new System.Net.Http.Headers.MediaTypeHeaderValue("multipart/form-data"));

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.DateFormatString = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffK";
        }

        public void Application_Error(object sender, EventArgs e)
        {
            Exception objErr = Server.GetLastError().GetBaseException();
            Context.Trace.Write(objErr.StackTrace);
        }
    }
}