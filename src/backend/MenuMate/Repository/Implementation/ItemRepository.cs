using Entity.Context;
using Entity.Models;
using Entity.ViewModels;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Implementation
{
    public class ItemRepository : EfRepository<Item>, IItemRepository
    {
        protected MenuDbContext _context;
        public ItemRepository(MenuDbContext context) : base(context)
        {
            _context = context;
        }
        public virtual async Task<List<Item>> GetAll()
        {
            return await Context.Set<Item>()
                                .Include(i => i.Category)
                                .OrderByDescending(i => i.Id)
                               .ToListAsync();
        }

        public async Task<List<ItemVM>> GetItemsByCategoryId(int categoryId)
        {
            return await (from I in _context.Item.Where(x => x.CategoryId == categoryId)
                          select new ItemVM
                          {
                              CategoryId = I.CategoryId,
                              Active = I.Active,
                              Id = I.Id,
                              Name = I.Name,
                              Code = I.Code,
                          }).ToListAsync();
        }

        public async Task<int> GetLastId()
        {
            return await _context.Set<Item>().CountAsync();
        }

    }
}
