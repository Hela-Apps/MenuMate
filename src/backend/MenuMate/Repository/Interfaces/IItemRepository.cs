using Entity.Models;
using Entity.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IItemRepository : IAsyncRepository<Item>
    {
        Task<List<ItemVM>> GetItemsByCategoryId(int categoryId);
        Task<int> GetLastId();
        Task<List<Item>> GetAll();
    }
}
