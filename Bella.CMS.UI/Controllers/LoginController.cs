using EFSchools.Englishtown.Bella.CMS.UI.Controllers.Helper;
using EFSchools.Englishtown.Bella.CMS.Web.Interface.Login;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers
{
    public class LoginController : Controller
    {

        private ILoginSvc loginSvc;

        internal LoginController(ILoginSvc _loginSvc)
        {
            loginSvc = _loginSvc;
        }


        [HttpPost]
        public ActionResult Index(LoginSvcArg arg)
        {
            var result = loginSvc.Login(arg);

            if (result.Success)
            {
                LoginHelper.SetLoginInfo(Response, result.BellaId, result.Type);
            }

            return Json(result);
        }

        
        [HttpPost]
        public ActionResult Logout()
        {
            LoginHelper.ClearLoginCookie(Request);

            return new EmptyResult();
        }

       
    }
}
