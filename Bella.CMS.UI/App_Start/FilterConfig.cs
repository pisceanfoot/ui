using System.Web;
using System.Web.Mvc;

namespace EFSchools.Englishtown.Bella.CMS.UI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}