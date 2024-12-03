using Entity.Context;
using Entity.Models;
using Entity.ViewModels;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Implementation
{
    public class MenuCategoryRepository : EfRepository<MenuCategory> , IMenuCategoryRepository
    {
        protected MenuDbContext _context;
        public MenuCategoryRepository(MenuDbContext context) :base(context)
        {
            _context = context;
        }

        public async Task<int>GetLastId()
        {
            return await _context.Set<MenuCategory>().CountAsync();
        }
       
    }
}
