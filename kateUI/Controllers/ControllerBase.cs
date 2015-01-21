using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers
{
    public abstract class ControllerBase : Controller
    {
        protected ActionResult JsonView(object obj)
        {
            return this.Json(obj, JsonRequestBehavior.AllowGet);
        }
    }
}