using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EFSchools.Englishtown.Bella.CMS.Web.Interface.Course;
using EFSchools.Englishtown.Bella.CMS.UI.Controllers.Filters;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers
{
    public class CourseController : ControllerBase
    {
        private ICourseSvc courseSvc;

        public CourseController(ICourseSvc courseSvc)
        {
            this.courseSvc = courseSvc;
        }

        //
        // GET: /Course/

        public ActionResult Index()
        {
            // SELECT

            return View();
        }

        [HttpPost]
        [BellaCmsAuthorize(LoginType.editor)]
        public ActionResult Get(CourseSvcArg arg)
        {
            var result = this.courseSvc.Get(arg);

            return JsonView(result);
        }

        [HttpPost]
        [BellaCmsAuthorize(LoginType.editor)]
        public ActionResult Save(CourseResult course)
        {
            this.courseSvc.Save(course);

            return Content("");
        }

        [HttpPost]
        [BellaCmsAuthorize(LoginType.editor)]
        public ActionResult GetList(string status)
        {
            var list = this.courseSvc.GetAllCouse();

            //var result = list.Where(i => i.Status == status);
            //return JsonView(result);

            return JsonView(list);
        }



    }
}
