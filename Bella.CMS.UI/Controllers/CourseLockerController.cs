using EFSchools.Englishtown.Bella.CMS.UI.Controllers.Filters;
using EFSchools.Englishtown.Bella.CMS.UI.Controllers.Helper;
using EFSchools.Englishtown.Bella.CMS.Web.Interface.CourseLocker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers
{
    public class CourseLockerController : ControllerBase
    {
        private ICourseLockerSvc courseLockerSvc;

        internal CourseLockerController(ICourseLockerSvc _courseLockerSvc)
        {
            courseLockerSvc = _courseLockerSvc;
        }

        [HttpPost]
        //[BellaCmsAuthorize(LoginType.editor)]
        public ActionResult Index(string course_id)
        {
            var result = courseLockerSvc.Update(new CourseLockerSvcArg
            {
                CourseId = course_id,
                BellaId = LoginHelper.GetBellaId(Request)
            });
                        

            return Json(result);
        }
    }
}