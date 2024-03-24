using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Slinks.Models;

namespace Slinks.Pages
{
    public class IndexModel : PageModel
    {
        private readonly DBContext _context;

        public IndexModel(DBContext context)
        {
            _context = context;
        }

        private string GenerateShortLink()
        {
            string uniqueCode = GenerateUniqueCode();
            string shortLink = "http://slinks.com/" + uniqueCode;
            return shortLink;
        }

        private string GenerateUniqueCode()
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            Random random = new Random();
            string result = new string(Enumerable.Repeat(chars, 6)
              .Select(s => s[random.Next(s.Length)]).ToArray());
            return result;
        }

        [BindProperty]
        public string OriginalUrl { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var shortLink = GenerateShortLink();

            var link = new Link
            {
                InputLink = OriginalUrl,
                ShortLink = shortLink,
                QueryDate = DateTime.UtcNow.Date
            };

            TempData["OriginalUrl"] = OriginalUrl;

            _context.Links.Add(link);
            await _context.SaveChangesAsync();

            return new OkObjectResult(new { shortLink });
        }
    }
}
