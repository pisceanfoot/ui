using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EFSchools.Englishtown.Bella.CMS.UI.Controllers.Filters;
using EFSchools.Englishtown.Bella.CMS.Web.Interface.Course;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers
{
    public class CourseListController : ControllerBase
    {
        private ICourseSvc courseSvc;

        public CourseListController(ICourseSvc courseSvc)
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

        //
        // GET: /All/

        //[BellaCmsAuthorize(LoginType.editor)]
        public ActionResult All()
        {
            List<CourseResult> allCourse = this.courseSvc.GetAllCouse();
            return JsonView(allCourse);
        }

        // GET: /Detail/{courseID}
        public ActionResult Detail(string id)
        {
            List<CourseResult> allCourse = this.courseSvc.GetAllCouse(id);
            return JsonView(allCourse);
        }
    }
}
