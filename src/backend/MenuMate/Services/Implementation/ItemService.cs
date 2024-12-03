using Entity.Models;
using Entity.ViewModels;
using Repository.Interfaces;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _repository;
        public ItemService(IItemRepository repository)
        {
            _repository = repository;
        }

        public async Task<Item> Add(Item item)
        {
            return await _repository.Add(item);
        }

        public async Task<Item> Get(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<IEnumerable<Item>> GetAll()
        {
            return await _repository.GetAll();
        }
        public async Task<int> GetLastId()
        {
            return await _repository.GetLastId();
        }

        public void Delete(Item item)
        {
            _repository.Remove(item);
        }

    }
}
