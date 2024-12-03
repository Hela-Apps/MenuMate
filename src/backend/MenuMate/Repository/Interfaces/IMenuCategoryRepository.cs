using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IMenuCategoryRepository : IAsyncRepository<MenuCategory>
    {
        Task<int> GetLastId();
    }
}
