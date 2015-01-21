using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EFSchools.Englishtown.Bella.CMS.Web.Interface.Preview;
using EFSchools.Englishtown.Bella.CMS.UI.Controllers.Filters;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers
{
    public class PreviewController : Controller
    {
        private IPreviewSvc previewSvc;

        public PreviewController(IPreviewSvc previewSvc)
        {
            this.previewSvc = previewSvc;
        }


        [BellaCmsAuthorize(LoginType.editor)]
        public ActionResult Preview(PreviewSvcArg arg)
        {
            this.previewSvc.Preview(arg);

            return new EmptyResult();
        }

    }
}
