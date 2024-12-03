using Entity;
using Entity.Context;
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
    public class EfRepository<T> : IAsyncRepository<T> where T : BaseEntity
    {

        #region Fields

        protected MenuDbContext Context;

        #endregion

        public EfRepository(MenuDbContext context)
        {
            Context = context;
        }

        #region Public Methods

        public async Task<T> GetById(int id)
        {
            //return await Context.Set<T>().FindAsync(id);
            return await Context.Set<T>().FindAsync(id);
        }

        public Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate)
            => Context.Set<T>().FirstOrDefaultAsync(predicate);

        public async Task<T> Add(T entity)
        {
            entity.CreatedDate = DateTime.Now;
            await Context.Set<T>().AddAsync(entity);
            await Context.SaveChangesAsync();
            return await Task.FromResult(entity);
        }

        public async Task<T> Update(T entity)
        {
            var oldRecord = await Context.Set<T>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == entity.Id);
            if (oldRecord != null)
            {
                entity.CreatedDate = oldRecord.CreatedDate;
                entity.CreatedBy = oldRecord.CreatedBy;
            }
            entity.LastUpdatedDate = DateTime.Now;
            var local = Context.Set<T>().Local.FirstOrDefault(entry => entry.Id.Equals(entity.Id));
            if (local != null)
            {
                Context.Entry(local).State = EntityState.Detached;
            }

            Context.Set<T>().Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return entity;
        }

        public Task Remove(T entity)
        {
            Context.Set<T>().Remove(entity);
            return Context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await Context.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate)
        {
            return await Context.Set<T>().Where(predicate).ToListAsync();
        }

        public Task<int> CountAll() => Context.Set<T>().CountAsync();

        public Task<int> CountWhere(Expression<Func<T, bool>> predicate)
            => Context.Set<T>().CountAsync(predicate);

        #endregion

    }
}
