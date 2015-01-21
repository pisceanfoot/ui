using EFSchools.Englishtown.Bella.CMS.UI.Controllers.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers.Filters
{
    public class BellaCmsAuthorizeAttribute : FilterAttribute, IAuthorizationFilter
    {
        private LoginType type;

        public BellaCmsAuthorizeAttribute()
        {
            this.type = LoginType.editor;
        }

        public BellaCmsAuthorizeAttribute(LoginType type)
        {
            this.type = type;
        }


        public void OnAuthorization(AuthorizationContext filterContext)
        {
            var bellaId = LoginHelper.GetBellaId(filterContext.HttpContext.Request);
            var type = LoginHelper.GetLoginType(filterContext.HttpContext.Request);

            if (string.IsNullOrEmpty(bellaId))
            {
                HandleUnauthorized(filterContext);
                return;
            }

            LoginType loginType = LoginType.none;
            Enum.TryParse<LoginType>(type, out loginType);


            if (loginType < this.type)
            {
                HandleUnauthorized(filterContext);
                return;
            }
        }

        private void HandleUnauthorized(AuthorizationContext filterContext)
        {
            //filterContext.Result = new HttpUnauthorizedResult();
        }


    }

    public enum LoginType
    {
        none = 0,
        editor = 1,
        approver = 2
    }

}