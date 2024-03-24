using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Slinks.Models;

namespace Slinks.Pages
{
    public class StatisticsModel : PageModel
    {
        private readonly DBContext _context;

        public StatisticsModel(DBContext context)
        {
            _context = context;
        }

        public IEnumerable<DateTime> Dates { get; set; }
        public int Count { get; set; }
        public void OnGet()
        {
            string originalUrl = TempData["OriginalUrl"] as string;
            Dates = GetAllStatByLink(originalUrl);
            Count = GetCount(originalUrl);
        }

        public IEnumerable<DateTime> GetAllStatByLink(string originalLink)
        {
            return _context.Links.Where(l => l.InputLink == originalLink).Select(l => l.QueryDate.Date).Distinct().ToList();
        }

        public int GetCount(string originalLink)
        {
            return _context.Links.Where(l => l.InputLink == originalLink).Select(l => l.QueryDate).Count();
        }
    }
}
