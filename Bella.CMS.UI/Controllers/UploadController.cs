using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EFSchools.Englishtown.Bella.CMS.Web.Interface;
using EFSchools.Englishtown.Bella.CMS.Web.Interface.Upload;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers
{
    public class UploadController : ControllerBase
    {
        private IUploadSvc uploadSvc;

        public UploadController(IUploadSvc uploadSvc)
        {
            this.uploadSvc = uploadSvc;
        }
        
        //
        // GET: /Upload/
        [HttpPost]
        public ActionResult Upload(UploadSvcArg arg)
        {
            if (Request.Files != null && Request.Files.Count == 1)
            {
                HttpPostedFileBase fileUplaod = Request.Files[0];
                if (fileUplaod != null && fileUplaod.ContentLength > 0)
                {
                    arg.FileName = fileUplaod.FileName;
                    arg.Stream = fileUplaod.InputStream;

                    string url = this.uploadSvc.Upload(arg);

                    ResultMessage<string> message = new ResultMessage<string>();
                    message.Data = url;

                    return JsonView(message);
                }
            }

            return new EmptyResult();
        }
    }
}
