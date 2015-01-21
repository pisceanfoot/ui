using EFSchools.Englishtown.Bella.CMS.UI.Controllers.Filters;
using EFSchools.Englishtown.Bella.CMS.UI.Controllers.Helper;
using EFSchools.Englishtown.Bella.CMS.Web.Interface.Approve;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers
{
    public class ApproveController : ControllerBase
    {
        private IApproveSvc approveSvc;

        public ApproveController(IApproveSvc _approveSvc)
        {
            approveSvc = _approveSvc;
        }


        [BellaCmsAuthorize(LoginType.editor)]
        public ActionResult Request([FromBody]ApproveSvcArg arg)
        {
            arg.Operator = LoginHelper.GetBellaId(HttpContext.Request);

            var result = approveSvc.Request(arg);

            return Json(result);
        }

        [BellaCmsAuthorize(LoginType.approver)]
        public ActionResult ApproveRequest([FromBody]ApproveSvcArg arg)
        {
            arg.Operator = LoginHelper.GetBellaId(HttpContext.Request);

            var result = approveSvc.ApproveRequest(arg);

            return Json(result);
        }


    }
}
